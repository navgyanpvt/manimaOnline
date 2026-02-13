import mongoose, { Schema, Document, Model } from "mongoose";

/* -------------------- */
/* Package Interface   */
/* -------------------- */
export interface IPackage {
  name: string;
  features: string[];
  priceAmount: number;
}

/* -------------------- */
/* Puja Interface      */
/* -------------------- */
export interface IPuja extends Document {
  imageUrl: string;
  name: string;
  location: string;
  templeType: string;
  packages: IPackage[];
  createdAt?: Date;
  updatedAt?: Date;
}

/* -------------------- */
/* Package Schema      */
/* -------------------- */
const packageSchema = new Schema<IPackage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      required: true,
    },
    priceAmount: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

/* -------------------- */
/* Validator           */
/* -------------------- */
const arrayLimit = (val: IPackage[]): boolean => val.length > 0;

/* -------------------- */
/* Puja Schema         */
/* -------------------- */
const pujaSchema = new Schema<IPuja>(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    templeType: {
      type: String,
      required: true,
    },
    packages: {
      type: [packageSchema],
      validate: {
        validator: arrayLimit,
        message: "At least one package is required",
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* -------------------- */
/* Model Export        */
/* -------------------- */
const Puja = (mongoose.models.Puja as Model<IPuja>) || mongoose.model<IPuja>("Puja", pujaSchema);

export default Puja;
