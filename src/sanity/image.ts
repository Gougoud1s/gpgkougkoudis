import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

type Builder = ReturnType<typeof createImageUrlBuilder>;
let _builder: Builder | null = null;
function getBuilder() {
  if (!projectId) return null;
  if (!_builder) _builder = createImageUrlBuilder({ projectId, dataset });
  return _builder;
}

export function urlFor(source: Parameters<NonNullable<Builder>["image"]>[0]) {
  const b = getBuilder();
  if (!b) {
    return {
      width: () => ({ quality: () => ({ url: () => "" }) }),
      url: () => "",
    } as unknown as ReturnType<Builder["image"]>;
  }
  return b.image(source).auto("format").fit("max");
}
