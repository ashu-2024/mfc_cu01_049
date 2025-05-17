const Vehicle = require('../models/Vehicle');

// Vehicle CRUD
exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    next(err);
  }
};

// Trip Operations
exports.addTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    vehicle.trips.push(req.body);
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const trip = vehicle.trips.id(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    Object.assign(trip, req.body);
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    vehicle.trips.id(req.params.tripId).remove();
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

// Advanced Queries
exports.getVehiclesWithLongTrips = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ 'trips.distance': { $gt: 200 } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getVehiclesFromCities = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ 'trips.startLocation': { $in: ['Delhi', 'Mumbai', 'Bangalore'] } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getTripsAfterDate = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ 'trips.startTime': { $gte: new Date('2024-01-01') } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getCarsOrTrucks = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ type: { $in: ['car', 'truck'] } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getTotalDistance = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const total = vehicle.totalDistance();
    res.json({ registrationNumber: vehicle.registrationNumber, totalDistance: total });
  } catch (err) {
    next(err);
  }
};
