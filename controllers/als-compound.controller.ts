import { type NextFunction, type Request, type Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import AlsCompound from "../models/als-compound.model";

const welcomePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(
      "Hey buddy! Feel free to create stuffs with this API. Try /api/als-compounds to get all ALS compounds.",
    );
  } catch (error) {
    next(error);
  }
};

const getAlsCompounds = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const alsCompounds = await AlsCompound.find();

    res.status(200).json({
      status: "success",
      data: {
        alsCompounds,
      },
    });
  } catch (error) {
    next(error);
  }
};

const searchParticularAlsCompound = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { q } = req.query;

    const formatQuery = decodeURI(q as string);

    const escapedFormatQuery = formatQuery.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );
    const regexPattern = new RegExp(escapedFormatQuery, "i");

    let molarRefractivityValue: number | null = null;

    if (!isNaN(parseFloat(formatQuery))) {
      molarRefractivityValue = parseFloat(formatQuery);
    }

    const alsCompounds = await AlsCompound.find({
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
      throw new ErrorHandler(404, "No ALS compound found.");
    }

    res.status(201).json({
      status: "success",
      message: "ALS compound has been found successfully",
      data: {
        alsCompounds,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAlsCompoundsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const alsCompound = await AlsCompound.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        alsCompound,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  welcomePage,
  getAlsCompounds,
  getAlsCompoundsById,
  searchParticularAlsCompound,
};
