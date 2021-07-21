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
exports.getFilmPeople = void 0;
const axios_1 = __importDefault(require("axios"));
const getFilmPeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = req.query.sortByName;
        let height = req.query.sortByHeight;
        const gender = req.query.filterByGender;
        const { id } = req.params;
        if (id > 6 || id < 1)
            return res
                .status(200)
                .json({ message: 'Number specified is incorrect. Data not Found' });
        const data = yield axios_1.default.get(`https://swapi.dev/api/films/${id}`);
        const charInfo = data.data;
        let result;
        let peopleList = [];
        let peopleLink = '';
        let sortedData;
        let heightCount = 0;
        let heightInfo;
        for (let i = 0; i < charInfo.characters.length; i++) {
            peopleLink = charInfo.characters[i];
            let peopleDetails = yield axios_1.default.get(peopleLink);
            let peopleData = peopleDetails.data;
            peopleList.push(peopleData);
        }
        if (gender) {
            peopleList = peopleList.filter((item) => {
                return item.gender.toLocaleLowerCase() === gender.toLocaleLowerCase();
            });
        }
        if (name || height) {
            if (name === 'ASC' || name === 'asc') {
                sortedData = peopleList.sort((a, b) => a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0));
            }
            if (name === 'DESC' || name === 'desc') {
                sortedData = peopleList.sort((a, b) => b.name[0].charCodeAt(0) - a.name[0].charCodeAt(0));
            }
            if (height === 'ASC' || height === 'asc') {
                sortedData = peopleList.sort((a, b) => parseInt(a.height) - parseInt(b.height));
            }
            if (height === 'DESC' || height === 'desc') {
                sortedData = peopleList.sort((a, b) => parseInt(b.height) - parseInt(a.height));
            }
            let totalNumberOfCharacters = sortedData.length;
            for (let i = 0; i < sortedData.length; i++) {
                heightCount += parseInt(sortedData[i].height);
            }
            heightInfo = `${heightCount}cm makes ${Math.round(heightCount / 30.48)}ft and ${(heightCount / 2.54).toFixed(2)} inches`;
            result = {
                totalNumberOfPeople: totalNumberOfCharacters,
                totalHeightOfPeople: heightInfo,
                peopleInfo: sortedData,
            };
            return res.status(201).json(result);
        }
        else {
            let totalNumberOfCharacters = peopleList.length;
            for (let i = 0; i < peopleList.length; i++) {
                heightCount += parseInt(peopleList[i].height);
            }
            heightInfo = `${heightCount}cm makes ${Math.round(heightCount / 30.48)}ft and ${(heightCount / 2.54).toFixed(2)} inches`;
            result = {
                totalNumberOfPeople: totalNumberOfCharacters,
                totalHeightOfPeople: heightInfo,
                peopleInfo: peopleList,
            };
            return res.status(200).json(result);
        }
    }
    catch (error) {
        console.error(error);
        throw new Error('Something went wrong');
    }
});
exports.getFilmPeople = getFilmPeople;
//# sourceMappingURL=character.js.map