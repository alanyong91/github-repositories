type GithubRepositoryOwnerType = {
  avatar_url: string;
  html_url: string;
  id: string;
  repos_url: string;
  login: string;
}

type GithubRepositoryType = {
  html_url: string;
  owner: GithubRepositoryOwnerType;
  id: string;
  name: string;
  full_name: string;
  url: string;
  description: string;
}

type GithubRepositoryData = GithubRepositoryType[]

interface GithubRepositoriesResponse {
  data: GithubRepositoryData
}

interface GithubState {
  loading: boolean;
  data: GithubRepositoryData;
  repositories: GithubRepositoryData;
  list: GithubRepositoryData;
  numberOfPage: number;
  perPage: number;
  page: number;
  searchKeyword: string;
  error: Error<string> | null;
}