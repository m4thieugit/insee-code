'use strict';

const axios = require('axios');

class inseeCode {
    /**
     * @constructor
     */
    constructor() {
        this.base_url = 'https://geo.api.gouv.fr';
        this.endpoints = {
            communes: '/communes', 
            departements: '/departements',
            region: '/regions'
        }
    }

    /**
     * Cherche le code insee d'une commune
     * @param {string} name Le nom de la commune
     * @returns {Promise<Array>} Retourne un tableau comportant le nom et le code insee de la commune
     */
    getCommune(name) {
        return new Promise((resolve, reject) => {
            this._request(this.endpoints.communes, name)
            .then((communes) => {
                let result = this._filterResults(communes, name);
                resolve(result);
            })
            .catch(reject);
        });
    }

    /**
     * Cherche le code insee d'un département
     * @param {string} name Le nom du département
     * @returns {Promise<Array>} Retourne un tableau comportant le nom et le code insee du département
     */
    getDepartement(name) {
        return new Promise((resolve, reject) => {
            this._request(this.endpoints.departements, name)
            .then((departements) => {
                let result = this._filterResults(departements, name);
                resolve(result);
            })
            .catch(reject);
        });
    }

    /**
     * Cherche le code insee d'une région
     * @param {string} name Le nom de la région
     * @returns {Promise<Array>} Retourne un tableau comportant le nom et le code insee de la région
     */
    getRegion(name) {
        return new Promise((resolve, reject) => {
            this._request(this.endpoints.region, name)
            .then((regions) => {
                let result = this._filterResults(regions, name);
                resolve(result);
            })
            .catch(reject);
        });
    }

    /**
     * Retourne l'url de requête
     * @type {string}
     * @readonly
     */
    get baseURL() {
        return this.base_url;
    }

    /**
     * Trie les résultats puis retourne le bon code Insee en fonction des matchs
     * @param {Array} results Les résultats de la méthode getCommune ou getDepartement 
     * @param {string} search La recherche de l'utilisateur
     * @returns {Array} Retourne un tableau comportant le nom et le code Insee de la recherche
     * @private
     */
    _filterResults(results, search) {
        search = search
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
        let finalResult = [];
        if (search === '') {
            for (let i = 0; i < results.length; i++) {
                let s = results[i]
                finalResult.push({ name: s.nom, code: s.code });
            }
            return finalResult;
        }
        for (let i = 0; i < results.length; i++) {
            let s = results[i]
            let s_name = s.nom
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
            if (s_name === search) {
                finalResult.push({ name: s.nom, code: s.code });
                return finalResult;
            }
        }
        for (let i = 0; i < results.length; i++) {
            let s = results[i]
            let s_name = s.nom
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
            if (s_name.includes(search)) {
                finalResult.push({ name: s.nom, code: s.code });
                return finalResult;
            }
        }
        return finalResult;
    }

    /**
     * Communication avec l'API geo du gouvernement
     * @param {string} endpoint L'endpoint de l'API
     * @param {string} name Le nom de la commune ou du département
     * @returns {Array} Les résultats de la requête
     */
    _request(endpoint, name) {
        return new Promise((resolve, reject) => {
            name = (!name || name.trim() === '' ? '' : '?nom=' + name);
            axios.get(this.base_url + endpoint + name)
            .then((res) => {
                resolve(res.data);
            })
            .catch(reject);
        });
    }
};

module.exports = inseeCode;
