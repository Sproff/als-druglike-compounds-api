"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const alsCompoundSchema = new mongoose_1.Schema({
    molecule: { type: String, required: true },
    canonicalSmiles: { type: String, required: true },
    esolClass: { type: String, required: true },
    bbbPermeant: { type: String, required: true },
    giAbsorption: { type: String, required: true },
    cyp2d6Inhibitor: { type: String, required: true },
    lipinski: { type: String, required: true },
}, {
    collection: "als-compounds",
});
const AlsCompound = (0, mongoose_1.model)("AlsCompound", alsCompoundSchema);
exports.default = AlsCompound;
