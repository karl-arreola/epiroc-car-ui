import mongoose, { Schema, models } from "mongoose";

const carSchema = new Schema(
    {
        parkingBreakOn: {
            type: Boolean,
            required: false,
        },
        checkEngineOn: {
            type: Boolean,
            required: false,
        },
        motorHighSpeedOn: {
            type: Boolean,
            required: false,
        },
        batteryLow: {
            type: Boolean,
            required: false,
        },
        powerInOut: {
            type: Number,
            required: false,
        },
        motorRPM: {
            type: Number,
            required: false,
        },
        batteryPercentage: {
            type: Number,
            required: false,
        },
        batteryTemp: {
            type: Number,
            required: false,
        },
        gearRatio: {
            type: String,
            required: false,
        },
        motorSpeed: {
            type: Number,
            required: false,
        },
        chargingOn: {
            type: Number,
            required: false,
        },
    },
    { versionKey: false, timestamps: true }
);

const Car = models.Car || mongoose.model("Car", carSchema);
export default Car;