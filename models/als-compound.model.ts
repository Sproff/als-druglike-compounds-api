import { Schema, model } from "mongoose";

const alsCompoundSchema = new Schema(
  {
    canonicalSmiles: { type: String, required: true },
    esolClass: { type: String, required: true },
    bbbPermeant: { type: String, required: true },
    giAbsorption: { type: String, required: true },
    cyp2d6Inhibitor: { type: String, required: true },
    lipinski: { type: String, required: true },
  },
  {
    collection: "als-compounds",
  },
);

const AlsCompound = model("AlsCompound", alsCompoundSchema);
export default AlsCompound;
