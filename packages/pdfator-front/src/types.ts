export const CONVERTING_STATUS = {
  NONE: "none",
  IN_PROGRESS: "inProgress",
  DONE: "done",
};

export const CONVERTING_FORMAT = ["PDF", "PNG"];
export const CONVERTING_SIZE = [
  "Letter",
  "Legal",
  "Tabloid",
  "Ledger",
  "A0",
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
];

export type PdfatorSupportedMime = "application/pdf" | "image/png";
export type PdfatorSupportedExtension = ".pdf" | ".png";

export const MIME_TO_EXTENSION: {
  [key in PdfatorSupportedMime]: PdfatorSupportedExtension;
} = {
  "application/pdf": ".pdf",
  "image/png": ".png",
};

export function isSupportedMime(value: string): value is PdfatorSupportedMime {
  return Object.keys(MIME_TO_EXTENSION).includes(value);
}
