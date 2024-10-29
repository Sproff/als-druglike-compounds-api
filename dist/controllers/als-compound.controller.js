"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchParticularAlsCompound = exports.getAlsCompoundsById = exports.getAlsCompounds = exports.welcomePage = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const als_compound_model_1 = __importDefault(require("../models/als-compound.model"));
const welcomePage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Hey buddy! Feel free to create stuffs with this API. Try /api/als-compounds to get all ALS compounds.");
    }
    catch (error) {
        next(error);
    }
});
exports.welcomePage = welcomePage;
const getAlsCompounds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alsCompounds = yield als_compound_model_1.default.find();
        res.status(200).json({
            status: "success",
            data: {
                alsCompounds,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAlsCompounds = getAlsCompounds;
const searchParticularAlsCompound = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const formatQuery = decodeURI(q);
        const escapedFormatQuery = formatQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regexPattern = new RegExp(escapedFormatQuery, "i");
        let molarRefractivityValue = null;
        if (!isNaN(parseFloat(formatQuery))) {
            molarRefractivityValue = parseFloat(formatQuery);
        }
        const alsCompounds = yield als_compound_model_1.default.find({
            $or: [
                { molecule: { $regex: regexPattern } },
                { canonicalSmiles: { $regex: regexPattern } },
                { esolClass: { $regex: regexPattern } },
                { molarRefractivity: molarRefractivityValue },
                { bbbPermeant: { $regex: regexPattern } },
                { lipinski: { $regex: regexPattern } },
            ],
        });
        if (alsCompounds.length < 1) {
            throw new errorHandler_1.ErrorHandler(404, "No ALS compound found.");
        }
        res.status(201).json({
            status: "success",
            message: "ALS compound has been found successfully",
            data: {
                alsCompounds,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.searchParticularAlsCompound = searchParticularAlsCompound;
const getAlsCompoundsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const alsCompound = yield als_compound_model_1.default.findById(id);
        res.status(200).json({
            status: "success",
            data: {
                alsCompound,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAlsCompoundsById = getAlsCompoundsById;
