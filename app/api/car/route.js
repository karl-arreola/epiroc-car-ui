import { connectMongoDB } from "@/lib/mongodb";
import Car from "@/models/car";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const car = await Car.findOne();

    return NextResponse.json({ car });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function PUT(req) {
  try {
    await connectMongoDB();
    const {
      _id, parkingBreakOn, checkEngineOn, motorHighSpeedOn, batteryLow, powerInOut, motorRPM, batteryPercentage, batteryTemp,
      gearRatio, motorSpeed, chargingOn
    } = await req.json();
    
    const car = await Car.findOneAndUpdate({ _id: _id }, {
      parkingBreakOn, checkEngineOn, motorHighSpeedOn, batteryLow, powerInOut, motorRPM, batteryPercentage, batteryTemp,
      gearRatio, motorSpeed, chargingOn
    });

    return NextResponse.json({ car });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}