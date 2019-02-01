/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const path = require('path');
const thenifyAll = require('thenify-all');

const hlclient = require('./hlrestclient');

require('chai').should();
const fs = thenifyAll(require('fs'));

/**
 * A class that handles all of the interactions with a business network for
 * a currently executing Cucumber scenario and steps.
 */
class Composer {

    /**
     * Constructor.
     * @param {string} uri The URI of the currently executing Cucumber scenario.
     * @param {boolean} errorExpected Is an error expected in this Cucumber scenario?
     */
    constructor (uri, errorExpected) {
        this.uri = uri;
        this.errorExpected = errorExpected;
    }

    /**
     * Handle an error; the error is thrown if an error is not expected in this Cucumber
     * scenario, otherwise it is stored for later testing.
     * @param {Error} error The error to handle.
     */
    handleError (error) {
        if (!this.errorExpected) {
            throw error;
        } else if (this.error) {
            throw new Error('an error was expected, but multiple errors have been thrown');
        }
        this.error = error;
    }

    /**
     * Called when testing for an expected error; validates that an error has been stored,
     * and optionally validates the error message against a regular expression.
     * @param {RegExp} [regex] Optional regular expression.
     */
    testError (regex) {
        if (!this.error) {
            throw new Error('an error was expected, but no errors have been thrown');
        } else if (regex) {
            this.error.should.match(regex);
        }
    }

    /**
     * Called before a Cucumber scenario starts executing to initialize this object.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    initialize () {

    }

    /**
     * Called after a Cucumber scenario finishes executing to destroy this object.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    destroy () {

    }

    /**
     * Deploy the specified business network archive, and once complete establish a connection
     * to the deployed business network for subsequent steps to use.
     * @param {string} businessNetworkDefinitionPath The business network archive file or
     * business network definition directory to load.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    deploy (businessNetworkDefinitionPath) {

    }

    /**
     * Create a business network card
     * @param {string} [businessNetworkIdentifier] Optional business network identifier
     * @param {string} [userID] Optional user id, defaults to "admin"
     * @param {object} [secret] Optional secret, defaults to "adminpw"
     * @return {IdCard} An id card
     */
    createBusinessNetworkCard (businessNetworkIdentifier, userID, secret) {

    }

    /**
     * Create an admin connection, import the card and connect
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    createAdminConnection () {

    }

    /**
     * Load the specified business network archive file from disk.
     * @param {string} businessNetworkDefinitionPath The business network archive file or
     * business network definition directory to load.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    loadBusinessNetworkDefinition (businessNetworkDefinitionPath) {

    }

    /**
     * Create an business network connection to a deployed business network and subscribe
     * to all events published by that business network.
     * @param {string} [cardName] The card name to connect with
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    createBusinessNetworkConnection (cardName) {

    }

    /**
     * Add a set of assets to an asset registry.
     * @param {string} namespace The namespace of the type of asset to add.
     * @param {string} name The name of the type of asset to add.
     * @param {DataTable} table The list of assets to add.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    addAssets (namespace, name, table) {
      if (table == 'AirplaneModel') {
        console.log(table);
      }
    }

    /**
     * Update a set of assets in an asset registry.
     * @param {string} namespace The namespace of the type of asset to add.
     * @param {string} name The name of the type of asset to add.
     * @param {DataTable} table The list of assets to add.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    updateAssets (namespace, name, table) {

    }

    /**
     * Remove a set of assets from an asset registry.
     * @param {string} namespace The namespace of the type of asset to add.
     * @param {string} name The name of the type of asset to add.
     * @param {DataTable} table The list of assets to add.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    removeAssets (namespace, name, table) {

    }

    /**
     * Test that a set of assets exist in an asset registry.
     * @param {string} namespace The namespace of the type of asset to test.
     * @param {string} name The name of the type of asset to test.
     * @param {DataTable} table The list of expected assets to test.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    testAssets (namespace, name, table) {

    }

    /**
     * Test that a set of assets do not exist in an asset registry.
     * @param {string} namespace The namespace of the type of asset to test.
     * @param {string} name The name of the type of asset to test.
     * @param {DataTable} table The list of expected assets to test.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    testNoAssets (namespace, name, table) {

    }

    /**
     * Add a set of participants to a participant registry.
     * @param {string} namespace The namespace of the type of participant to add.
     * @param {string} name The name of the type of participant to add.
     * @param {DataTable} table The list of participants to add.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    addParticipants (namespace, name, table) {

    }

    /**
     * Update a set of participants in a participant registry.
     * @param {string} namespace The namespace of the type of participant to add.
     * @param {string} name The name of the type of participant to add.
     * @param {DataTable} table The list of participants to add.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    updateParticipants (namespace, name, table) {

    }

    /**
     * Remove a set of participants from a participant registry.
     * @param {string} namespace The namespace of the type of participant to add.
     * @param {string} name The name of the type of participant to add.
     * @param {DataTable} table The list of participants to add.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    removeParticipants (namespace, name, table) {

    }

    /**
     * Test that a set of participants exist in a participant registry.
     * @param {string} namespace The namespace of the type of participant to test.
     * @param {string} name The name of the type of participant to test.
     * @param {DataTable} table The list of expected participants to test.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    testParticipants (namespace, name, table) {

    }

    /**
     * Test that a set of participants do not exist in a participant registry.
     * @param {string} namespace The namespace of the type of participant to test.
     * @param {string} name The name of the type of participant to test.
     * @param {DataTable} table The list of expected participants to test.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    testNoParticipants (namespace, name, table) {

    }

    /**
     * Submit a set of transactions for execution.
     * @param {string} namespace The namespace of the type of transaction to submit.
     * @param {string} name The name of the type of transaction to submit.
     * @param {DataTable} table The list of transactions to submit.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    submitTransactions (namespace, name, table) {

    }

    /**
     * Test that a set of events have been emitted by a business network.
     * @param {string} namespace The namespace of the type of event to test.
     * @param {string} name The name of the type of event to test.
     * @param {DataTable} table The list of expected events to test.
     */
    testEvents (namespace, name, table) {

    }

    /**
     * Issue an identity to the specified participant.
     * @param {string} participant The fully qualified participant ID.
     * @param {string} userID The user ID.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    issueIdentity (participant, userID) {

    }

    /**
     * Use an issued identity for all subsequent steps in this scenario.
     * @param {string} userID The user ID.
     * @return {Promise} A promise that is resolved when complete, or rejected with an
     * error.
     */
    useIdentity (userID) {

    }

    /**
     * Convert a Cucumber data table or doc string into an array of resources.
     * @param {string} namespace The namespace of the type of resource.
     * @param {string} name The name of the type of resource.
     * @param {DataTable} table The Cucumber data table.
     * @return {Resource[]} An array of resources generated from the Cucumber data table.
     */
    convertInputToResources (namespace, name, table) {
        if (typeof table === 'string') {
            return this.convertStringToResources(table);
        } else {
            return this.convertTableToResources(namespace, name, table);
        }
    }

    /**
     * Convert a Cucumber doc string into an array of resources.
     * @param {string} string The Cucumber doc string.
     * @return {Resource[]} An array of resources generated from the Cucumber data table.
     */
    convertStringToResources (string) {
        let data = JSON.parse(string);
        if (!Array.isArray(data)) {
            data = [data];
        }
        return data.map((element) => {
            return this.serializer.fromJSON(element);
        });
    }

    /**
     * Convert a Cucumber data table into an array of resources.
     * @param {string} namespace The namespace of the type of resource.
     * @param {string} name The name of the type of resource.
     * @param {DataTable} table The Cucumber data table.
     * @return {Resource[]} An array of resources generated from the Cucumber data table.
     */
    convertTableToResources (namespace, name, table) {
        const fqn = namespace + '.' + name;
        const isEvent = fqn.includes('Event');
        const isTransaction = fqn.includes('Transaction');;
        const properties = classDeclaration.getProperties();
        const identifierFieldName = classDeclaration.getIdentifierFieldName();
        const rows = table.hashes();
        const resources = rows.map((row) => {
            let resource;
            if (isEvent) {
                resource = this.factory.newEvent(namespace, name);
            } else if (isTransaction) {
                resource = this.factory.newTransaction(namespace, name);
            } else {
                const identifier = row[identifierFieldName];
                resource = this.factory.newResource(namespace, name, identifier);
            }
            properties.forEach((property) => {
                const propertyName = property.getName();
                const propertyValue = row[propertyName];
                if (typeof propertyValue === 'undefined') {
                    return;
                } else if (property instanceof RelationshipDeclaration) {

                    resource[propertyName] = this.factory.newRelationship(property.getNamespace(), property.getType(), propertyValue);

                } else {
                    resource[propertyName] = this.convertValueToType(propertyValue, property.getType());
                }
            });
            return resource;
        });
        return resources;
    }

    /**
     * Convert a property value string into a specific type.
     * @param {String} value - property value.
     * @param {String} type - model type.
     * @return {*} correctly typed value.
     */
    convertValueToType (value, type) {
        try {
            switch (type) {
            case 'Boolean':
                if (value !== 'true' && value !== 'false') {
                    throw new Error();
                }
                return value === 'true';
            case 'DateTime': {
                const result = new Date(value);
                result.toISOString();
                return result;
            }
            case 'Double': {
                const result = Number.parseFloat(value);
                if (isNaN(result)) {
                    throw new Error();
                }
                return result;
            }
            case 'Integer':
            case 'Long': {
                const result = Number.parseInt(value);
                if (isNaN(result)) {
                    throw new Error();
                }
                return result;
            }
            default:
                return value;
            }
        } catch (error) {
            throw new Error(`Invalid value "${value}" for type "${type}"`);
        }
    }

    /**
     * Compare two resources for equality, and throw an exception if they do not match.
     * @param {Resource} actualResource The actual resource.
     * @param {Resource} expectedResource The expected resource.
     */
    compareResources (actualResource, expectedResource) {
        const classDeclaration = expectedResource.getClassDeclaration();
        const isEvent = (classDeclaration instanceof EventDeclaration);
        const identifierFieldName = classDeclaration.getIdentifierFieldName();
        const actualJSON = this.serializer.toJSON(actualResource);
        const expectedJSON = this.serializer.toJSON(expectedResource);
        if (isEvent) {
            delete actualJSON[identifierFieldName];
            delete actualJSON.timestamp;
            delete expectedJSON[identifierFieldName];
            delete expectedJSON.timestamp;
        }
        actualJSON.should.deep.equal(expectedJSON);
    }

}

module.exports = Composer;
