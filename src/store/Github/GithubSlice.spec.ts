import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";

import axios from "axios";

import { store } from "./../index";

import {
  fetchGithubRepositories,
  updatePageNumber,
  searchByKeyword,
} from "./GithubSlice";

jest.mock("axios");

describe("GithubSlice unit test", () => {
  const response: GithubRepositoriesResponse = {
    data: [...new Array(25)].map(() => ({
      html_url: faker.internet.url(),
      owner: {
        avatar_url: faker.internet.url(),
        html_url: faker.internet.url(),
        id: faker.datatype.uuid(),
        repos_url: faker.internet.url(),
        login: faker.lorem.word(),
      },
      id: faker.datatype.uuid(),
      name: faker.lorem.word(),
      full_name: faker.lorem.word(),
      url: faker.internet.url(),
      description: faker.lorem.sentences(),
    })),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchGithubRepositories unit test", () => {
    test("should get data from API", async () => {
      const apiUrl = process.env.REACT_APP_GITHUB_API_URL

      axios.get = jest
        .fn()
        .mockImplementation(() => Promise.resolve(response));

      await store.dispatch(fetchGithubRepositories());

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${apiUrl}/repositories`
      );
    });

    test("should return error if API failed", async () => {
      const errorMessage = faker.lorem.sentence();

      axios.get = jest
        .fn()
        .mockImplementation(() => Promise.reject(errorMessage));

      await store.dispatch(fetchGithubRepositories());

      expect(store.getState().github.error).toEqual(errorMessage);
    });
  });

  describe("reducer unit test", () => {
    describe("updatePageNumber() test", () => {
      test("should get data from API", async () => {
        axios.get = jest
          .fn()
          .mockImplementation(() => Promise.resolve(response));

        await store.dispatch(fetchGithubRepositories());
        store.dispatch(updatePageNumber(2));
        
        const list = response.data.slice(10, 20)
        expect(store.getState().github.list).toStrictEqual(list)
      });
    });

    describe("searchByKeyword() test", () => {
      test("should filter by keyword", async () => {
        const keyword = response.data[0].name;

        axios.get = jest
          .fn()
          .mockImplementation(() => Promise.resolve(response));

        await store.dispatch(fetchGithubRepositories());
        store.dispatch(searchByKeyword(keyword));

        expect(store.getState().github.list.length).toBeGreaterThanOrEqual(1)
        store.getState().github.list.forEach(item => {
          expect(item.name).toContain(keyword)
        })
      });

      test("should get default list if keyword is empty string", async () => {
        axios.get = jest
          .fn()
          .mockImplementation(() => Promise.resolve(response));

        await store.dispatch(fetchGithubRepositories());
        store.dispatch(searchByKeyword(""));

        expect(store.getState().github.repositories.length).toEqual(store.getState().github.data.length)
      });
    });
  });
});
