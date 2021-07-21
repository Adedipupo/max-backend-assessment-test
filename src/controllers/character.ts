import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

 interface Character {
    peopleInfo: Record<string, any>[];
    totalNumberOfPeople: number;
    totalHeightOfPeople: string;
  }

export const getFilmPeople = async (req: Request, res: Response) => {
  try {
    let name = req.query.sortByName as string;
    let height = req.query.sortByHeight as string;
    const gender = req.query.filterByGender as string;
    const { id }: any = req.params;
    if (id > 6 || id < 1)
      return res
        .status(200)
        .json({ message: 'Number specified is incorrect. Data not Found' });
    const data = await axios.get(`https://swapi.dev/api/films/${id}`);
    const charInfo = data.data;
    let result: Character;
    let peopleList = [];
    let peopleLink: string = '';
    let sortedData: any;
    let heightCount = 0;
    let heightInfo: string;
    for (let i = 0; i < charInfo.characters.length; i++) {
      peopleLink = charInfo.characters[i];
      let peopleDetails = await axios.get(peopleLink);
      let peopleData = peopleDetails.data;
      peopleList.push(peopleData);
    }
 
    if (gender) {
      peopleList = peopleList.filter((item: Record<string, any>) => {
        return item.gender.toLocaleLowerCase() === gender.toLocaleLowerCase();
      });
    }
   
    if (name || height) {
      if (name === 'ASC' || name === 'asc') {
        sortedData = peopleList.sort(
          (a: any, b: any) => a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0)
        );
      }
      if (name === 'DESC' || name === 'desc') {
        sortedData = peopleList.sort(
          (a: any, b: any) => b.name[0].charCodeAt(0) - a.name[0].charCodeAt(0)
        );
      }
      if (height === 'ASC' || height === 'asc') {
        sortedData = peopleList.sort(
          (a: any, b: any) => parseInt(a.height) - parseInt(b.height)
        );
      }
      if (height === 'DESC' || height === 'desc') {
        sortedData = peopleList.sort(
          (a: any, b: any) => parseInt(b.height) - parseInt(a.height)
        );
      }
      let totalNumberOfCharacters = sortedData.length;
      for (let i = 0; i < sortedData.length; i++) {
        heightCount += parseInt(sortedData[i].height);
      }
      heightInfo = `${heightCount}cm makes ${Math.round(
        heightCount / 30.48
      )}ft and ${(heightCount / 2.54).toFixed(2)} inches`;
      result = {
        totalNumberOfPeople: totalNumberOfCharacters,
        totalHeightOfPeople: heightInfo,
        peopleInfo: sortedData,
      };
      return res.status(201).json(result);
    } else {
      let totalNumberOfCharacters = peopleList.length;
      for (let i = 0; i < peopleList.length; i++) {
        heightCount += parseInt(peopleList[i].height);
      }
      heightInfo = `${heightCount}cm makes ${Math.round(
        heightCount / 30.48
      )}ft and ${(heightCount / 2.54).toFixed(2)} inches`;
      result = {
        totalNumberOfPeople: totalNumberOfCharacters,
        totalHeightOfPeople: heightInfo,
        peopleInfo: peopleList,
      };
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong')
  }
};