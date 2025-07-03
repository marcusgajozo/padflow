import padA from "@audios/pads/pad-a.mp3";
import padASharp from "@audios/pads/pad-a-sharp.mp3";
import padB from "@audios/pads/pad-b.mp3";
import padG from "@audios/pads/pad-g.mp3";
import padGSharp from "@audios/pads/pad-g-sharp.mp3";
import padFSharp from "@audios/pads/pad-f-sharp.mp3";
import padF from "@audios/pads/pad-f.mp3";
import padE from "@audios/pads/pad-e.mp3";
import padD from "@audios/pads/pad-d.mp3";
import padDSharp from "@audios/pads/pad-d-sharp.mp3";
import padCSharp from "@audios/pads/pad-c-sharp.mp3";
import padC from "@audios/pads/pad-c.mp3";

export const padsContinuos = {
  C: padC,
  "C#": padCSharp,
  D: padD,
  "D#": padDSharp,
  E: padE,
  F: padF,
  "F#": padFSharp,
  G: padG,
  "G#": padGSharp,
  A: padA,
  "A#": padASharp,
  B: padB,
} as const;
