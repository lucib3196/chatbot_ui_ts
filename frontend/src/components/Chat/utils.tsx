import { type ContentBlock } from "langchain";

type ImageUrl = {
  url: string;
};

type MessagePayload =
  | {
    type: "text";
    text: string;
  }
  | {
    type: "image_url";
    image_url: ImageUrl;
  };

function isMessagePayload(x: unknown): x is MessagePayload {
  return (
    typeof x === "object" &&
    x !== null &&
    "type" in x &&
    ("text" in x || "image_url" in x)
  );
}

function isMessagePaylodArray(x: unknown): x is MessagePayload[] {
  return Array.isArray(x) && x.every(isMessagePayload);
}
function isContentBlock(x: unknown): x is ContentBlock {
  return typeof x === "object" && x !== null && "type" in x && "text" in x;
}

function isContentBlockArray(x: unknown): x is ContentBlock[] {
  return Array.isArray(x) && x.every(isContentBlock);
}

export function cleanChildren(
  cd: ContentBlock[] | string | MessagePayload[]
) {
  if (typeof cd === "string") {
    return cd;
  }

  else if (isContentBlockArray(cd)) {
    if (!cd.length) return "";
    const last = cd.at(-1);

    if (last?.type === "image_generation_call") {
      return "image generated";
    }

    if (!last || typeof last.text !== "string") {
      return "";
    }

    return last.text;
  }

  else if (isMessagePaylodArray(cd)) {
    return cd.map((v, i) => {
      if (v.type === "text") {
        return (
          <div className="" key={i}>
            {v.text}
          </div>
        );
      }

      if (v.type === "image_url") {
        return (
          <img
            key={i}
            src={v.image_url.url}
            alt="message"
            className="max-w-2/5 rounded-md"
          />
        );
      }

      return null;
    });
  }
  console.log("Cannot determine type for ", cd)

  return "";
}

