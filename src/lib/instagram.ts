import type { Homepage, Locale, SanityImage } from "@/sanity/types";
import { loc } from "@/sanity/types";

export type InstagramPost = {
  id: string;
  image: SanityImage;
  url: string;
  caption: string;
};

export type InstagramProfile = {
  name: string;
  username: string;
  imageUrl?: string;
  mediaCount?: number;
  followersCount?: number;
  followingCount?: number;
};

type GraphProfile = {
  name?: string;
  username?: string;
  profile_picture_url?: string;
  media_count?: number;
  followers_count?: number;
  follows_count?: number;
};

type GraphMedia = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
};

export async function getInstagramProfile(): Promise<InstagramProfile> {
  const fallback = { name: "GP GOUGOUDIS", username: "gp.gougoudis" };
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!token) return fallback;

  const base = userId
    ? `https://graph.facebook.com/v22.0/${userId}`
    : "https://graph.instagram.com/me";
  const url = new URL(base);
  url.searchParams.set("fields", "name,username,profile_picture_url,media_count,followers_count,follows_count");
  url.searchParams.set("access_token", token);

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return fallback;
    const profile = await response.json() as GraphProfile;
    return {
      name: profile.name || fallback.name,
      username: profile.username || fallback.username,
      imageUrl: profile.profile_picture_url,
      mediaCount: profile.media_count,
      followersCount: profile.followers_count,
      followingCount: profile.follows_count,
    };
  } catch {
    return fallback;
  }
}

export async function getInstagramPosts(
  homepage: Homepage,
  locale: Locale,
  profileUrl: string
): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (token) {
    const base = userId
      ? `https://graph.facebook.com/v22.0/${userId}/media`
      : "https://graph.instagram.com/me/media";
    const url = new URL(base);
    url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink");
    url.searchParams.set("limit", "6");
    url.searchParams.set("access_token", token);

    try {
      const response = await fetch(url, { next: { revalidate: 3600 } });
      if (response.ok) {
        const payload = await response.json() as { data?: GraphMedia[] };
        const posts = (payload.data || []).flatMap((post) => {
          const imageUrl = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
          if (!imageUrl) return [];
          return [{
            id: post.id,
            image: { asset: { url: imageUrl }, alt: post.caption || "Instagram post" },
            url: post.permalink || profileUrl,
            caption: post.caption || "",
          }];
        });
        if (posts.length) return posts;
      }
    } catch (error) {
      console.warn("[instagram] Graph API unavailable, using Sanity fallback", error);
    }
  }

  return (homepage.instagramPosts || []).flatMap((post, index) => {
    if (!post.image) return [];
    return [{
      id: post._key || `instagram-${index}`,
      image: post.image,
      url: post.url || profileUrl,
      caption: loc(post.caption, locale),
    }];
  });
}
