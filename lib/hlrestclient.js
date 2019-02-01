const Swagger = require('swagger-client');


var coldClient = Swagger({
    url: process.env.swaggerSpec,
    requestInterceptor: function(req) {
        if (process.env.shoganaiApiKey) {
            req.headers["X-Api-Key"] = process.env.shoganaiApiKey;
        }
    }
});

var hlclient = {
    airportExists: function(airportId) {
        return new Promise(function(resolve, reject){

            coldClient.then(
                function(client) {
                    // Tags interface
                    client.apis.Airport.Airport_exists({id: airportId}).then(
                        function(result) {
                            if (result.status == 200) {
                                resolve(airportId);
                            } else {
                                resolve(false);
                            }
                        },
                        function(error) {
                            if (error.status == 404) {
                                resolve(false);
                            }
                            else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );
                },
                function(error) {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    airportStandExists: function(standId) {
        return new Promise(function(resolve, reject){

            coldClient.then(
                function(client) {
                    // Tags interface
                    client.apis.AirportStand.AirportStand_exists({id: standId}).then(
                        function(result) {
                            if (result.status == 200) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        function(error){
                            if (error.status == 404) {
                                resolve(false);
                            }
                            else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );
                },
                function(error) {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    deviceExists: function(deviceId) {
        return new Promise(function(resolve, reject){

            coldClient.then(
                function(client) {
                    // Tags interface
                    client.apis.Device.Device_exists({id: deviceId}).then(
                        function(result) {
                            if (result.status == 200) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        function(error){
                            if (error.status == 404) {
                                resolve(false);
                            }
                            else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );
                },
                function(error) {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    airlineExists: function(airlineId) {
        return new Promise(function(resolve, reject){

            coldClient.then(
                function(client) {
                    // Tags interface
                    console.log(airlineId);
                    client.apis.Airline.Airline_exists({id: airlineId}).then(
                        function(result) {
                            if (result.status == 200) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        function(error){
                            if (error.status == 404) {
                                resolve(false);
                            }
                            else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );
                },
                function(error) {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    airplaneExists: function(tailNumber) {
        return new Promise(function(resolve, reject){
            coldClient.then(
                function(client) {
                    // Tags interface
                    console.log(tailNumber);
                    client.apis.Airplane.Airplane_exists({id: tailNumber}).then(
                        function(result) {
                            if (result.status == 200) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        function(error){
                            if (error.status == 404) {
                                resolve(false);
                            }
                            else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );
                },
                function(error) {
                    reject(error);
                }
            );
        });
    },
    ensureAirportExists: function(airport) {
        return new Promise(function(resolve, reject){
            coldClient.then(
                function(client) {
                    // Tags interface
                    hlclient.airportExists(airport.Id).then(
                        function(exists) {
                            if (exists) {
                                resolve(airport.Id);
                            } else {
                                client.apis.Airport.Airport_create({
                                    "data": airport
                                }).then(
                                    function(result) {
                                        if (result.status == 200) {
                                            resolve(airport.Id);
                                        } else {
                                            reject(result.body);
                                        }
                                    },
                                    function (error) {
                                        reject(error);
                                    }
                                );
                            }
                        },
                        function(error) {
                            reject(error);
                        }
                    )

                },
                function(error) {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    ensureAirportStandExists: function(airportStand) {
        return new Promise(function(resolve, reject){
            coldClient.then(
                function(client) {
                    // Tags interface
                    hlclient.airportStandExists(airportStand.Id).then(
                        function(exists) {
                            if (exists) {
                                resolve(true);
                            } else {
                                client.apis.AirportStand.AirportStand_create({
                                    "data": airportStand
                                }).then(
                                    function(result) {
                                        if (result.status == 200) {
                                            resolve(result.body);
                                        } else {
                                            reject(result.body);
                                        }
                                    },
                                    function (error) {
                                        reject(error);
                                    }
                                );
                            }
                        },
                        function(error) {
                            reject(error);
                        }
                    )
                },
                function(error) {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    ensureAirlineExists: function(airlineId) {
        return new Promise(function(resolve, reject){
            coldClient.then(
                function(client) {
                    // Tags interface
                    hlclient.airlineExists(airlineId).then(
                        function(exists) {
                            if (exists) {
                                resolve(true);
                            } else {
                                client.apis.Airline.Airline_create({
                                    "data":{
                                        "$class": "shoganai.telemetry.Airline",
                                        "Id": airlineId,
                                        "Name": airlineId
                                    }
                                }).then(
                                    function(result) {
                                        if (result.status == 200) {
                                            resolve(result.body);
                                        } else {
                                            reject(result.body);
                                        }
                                    },
                                    function (error) {
                                        reject(error);
                                    }
                                );
                            }
                        },
                        function(error) {
                            reject(error);
                        }
                    )

                },
                function(error) {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    ensureAirplaneExists: function(airplaneId, airlineId) {
        return new Promise(function(resolve, reject){
            coldClient.then(
                function(client) {
                    // Tags interface
                    hlclient.airplaneExists(airplaneId).then(
                        function(exists) {
                            if (exists) {
                                resolve(true);
                            } else {
                                client.apis.Airplane.Airplane_create({
                                    "data": {
                                        "$class": "shoganai.telemetry.Airplane",
                                        "TailNumber": airplaneId,
                                        "Model": "Not Available",
                                        "Owner": "resource:shoganai.telemetry.Airline#" + airlineId
                                    }
                                }
                                ).then(
                                    function(result) {
                                        if (result.status == 200) {
                                            resolve(result.body);
                                        } else {
                                            reject(result.body);
                                        }
                                    },
                                    function (error) {
                                        reject(error);
                                    }
                                );
                            }
                        },
                        function(error) {
                            reject(error);
                        }
                    )
                },
                function(error) {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    ensureDeviceExists: function(deviceId, airplaneId) {
        return new Promise(function(resolve, reject){
            coldClient.then(
                function(client) {
                    // Tags interface
                    hlclient.deviceExists(deviceId).then(
                        function(exists) {
                            if (exists) {
                                resolve(true);
                            } else {
                                client.apis.Device.Device_create({
                                    "data":{
                                        "$class": "shoganai.telemetry.Device",
                                        "Id": deviceId,
                                        "Location": "resource:shoganai.telemetry.Airplane#" + airplaneId,
                                        "Firmware": "N/A",
                                        "Version": "N/A",
                                        "LastUpdated": "2000-01-01T00:00:00Z"
                                    }
                                }).then(
                                    function(result) {
                                        if (result.status == 200) {
                                            resolve(result.body);
                                        } else {
                                            reject(result.body);
                                        }
                                    },
                                    function (error) {
                                        reject(error);
                                    }
                                );
                            }
                        },
                        function(error) {
                            reject(error);
                        }
                    )

                },
                function(error) {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    createTelemetryTransaction: function(message, deviceId) {
        return new Promise(function(resolve, reject){
            coldClient.then(
                function(client) {
                    // Tags interface
                    for (prop in message) {
                        if (prop !== "timestamp" && prop !== "altitude" && prop !== "longitude" && prop !== "latitude") {
                            var transaction = {
                                "$class": "shoganai.telemetry.TelemetryTransaction",
                                "Origin": "resource:shoganai.telemetry.Device#"+deviceId,
                                "Measurement": prop,
                                "Value": message[prop],
                                "Latitude": parseFloat(message["latitude"]),
                                "Longitude": parseFloat(message["longitude"]),
                                "Altitude": parseFloat(message["altitude"]),
                                "OriginalTimestamp": message["timestamp"]
                            };
                            client.apis.TelemetryTransaction.TelemetryTransaction_create({data: transaction}).then(
                                function(result) {
                                    if (result.status == 200) {
                                        resolve(true);
                                    } else {
                                        resolve(false);
                                    }
                                },
                                function(error){
                                    reject(error);
                                }
                            );
                        }
                    }
                },
                function(error) {
                    reject(error);
                }
            );
        });
    }
}

module.exports = hlclient;
