import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  fetchGithubRepositories,
  updatePageNumber,
  searchByKeyword,
} from "./store/Github/GithubSlice";

import { Button, Input, Container } from "./styled/Common";
import { FilterForm } from "./styled/Form";
import { RepoTable } from "./styled/Table";
import { Pagination } from "./styled/Pagination";

const Repositories: React.FC = () => {
  const dispatch = useAppDispatch();

  const { loading, list, error, numberOfPage, page, perPage } = useAppSelector(
    (state) => state.github
  );

  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    dispatch(fetchGithubRepositories());
  }, [dispatch]);

  const onSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(searchByKeyword(keyword));
  };

  const goToPage = (number: number) => {
    window.scroll(0, 0);
    
    dispatch(updatePageNumber(number))
  };

  return (
    <Container>
      <FilterForm>
        <form onSubmit={onSearch}>
          <Input
            type="search"
            disabled={loading}
            value={keyword}
            placeholder="Search keyword here"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button disabled={loading}>Search</Button>
        </form>
      </FilterForm>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something goes wrong...</div>
      ) : list.length > 0 ? (
        <>
          <RepoTable>
            <thead>
              <tr>
                <th>No</th>
                <th>Profile Picture</th>
                <th>Owner</th>
                <th>Repo Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {list.map((repo, index) => (
                <tr key={repo.id}>
                  <td>{index + 1 + (page - 1) * perPage}</td>
                  <td>
                    <img
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                      width={50}
                    />
                  </td>
                  <td>{repo.owner.login}</td>
                  <td>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      {repo.name}
                    </a>
                  </td>
                  <td>{repo.description}</td>
                </tr>
              ))}
            </tbody>
          </RepoTable>
          {numberOfPage > 1 && (
            <Pagination>
              <Button disabled={page === 1} onClick={() => goToPage(page - 1)}>
                Prev
              </Button>
              {[...new Array(numberOfPage)].map((_, index) => (
                <Button
                  key={index}
                  active={index + 1 === page}
                  disabled={index + 1 === page}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                disabled={page === numberOfPage}
                onClick={() => goToPage(page + 1)}
              >
                Next
              </Button>
            </Pagination>
          )}
        </>
      ) : (
        <div>No data</div>
      )}
    </Container>
  );
};

export default Repositories;
