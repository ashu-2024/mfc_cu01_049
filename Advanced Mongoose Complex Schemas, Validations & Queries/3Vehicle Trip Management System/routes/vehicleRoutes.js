const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/vehicleController');

// Vehicle
router.post('/vehicles', ctrl.createVehicle);
router.get('/vehicles', ctrl.getAllVehicles);
router.put('/vehicles/:id', ctrl.updateVehicle);
router.delete('/vehicles/:id', ctrl.deleteVehicle);

// Trips
router.post('/vehicles/:id/trips', ctrl.addTrip);
router.put('/vehicles/:id/trips/:tripId', ctrl.updateTrip);
router.delete('/vehicles/:id/trips/:tripId', ctrl.deleteTrip);

// Queries
router.get('/query/long-trips', ctrl.getVehiclesWithLongTrips);
router.get('/query/from-cities', ctrl.getVehiclesFromCities);
router.get('/query/trips-after-date', ctrl.getTripsAfterDate);
router.get('/query/cars-or-trucks', ctrl.getCarsOrTrucks);

// Bonus
router.get('/vehicles/:id/total-distance', ctrl.getTotalDistance);

module.exports = router;
