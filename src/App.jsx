
import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Error from './components/Error'
// import RepoCards from './components/RepoCards';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Loading from './components/Loading';
import Empty from './components/Empty';
import Button from './components/Button';



function App() {
  const token = import.meta.env.REACT_APP_GITHUB_TOKEN;

  const [repo, setRepo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [language, setLanguage] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [renderRepo, setRenderRepo] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const randomNumber = (max) => Math.floor(Math.random() * max);

  const languageColors = {
    javascript: 'yellow',
    typescript: 'blue',
    solidity: 'black',
    python: 'green',
    c: 'orange',
    php: 'purple'
  };

  const handleFetchRepo = useCallback(function() {
    async function fetchRepos () {
       try{
        setIsEmpty(false)
        setIsLoading(true)
        setError('')
        setIsActive(isActive)
        const res = await fetch(
          `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`, {
          headers: {
            'Authorization': token
          }
        })
        if(!res.ok) 
          throw new Error ('Error fetching repository')
        const data = await res.json();
        if(data.incomplete_results === 'true') throw new Error ('Repo not found');
        const randomRepo = data.items[randomNumber(data.items.length)];
        
        setRepo(randomRepo);
        setHasFetched(true)

        setError('');
        setIsEmpty(false)
        setIsLoading(false);
        setIsActive(isActive)
        console.log(data);
      } catch(err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRepos();
  }, [language, isActive]);

  const languageColor = repo ? languageColors[repo.language.toLowerCase()] || 'gray' : 'gray';


  return (
    <div className="repo-body">  
    <h2>GitHub Repository Finder</h2>
      <select value={language} onChange={(e)=> setLanguage(e.target.value)} > 
      <option value=''>Select language</option>
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="solidity">Solidity</option> 
      <option value="python">Python</option> 
      <option value="c++">C</option> 
      <option value="PHP">PHP</option> 
      </select>

          {repo && !error && (
            <div key={repo.id} className="repo-card">
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="repo-icon">
                <p><i className="fa-solid fa-circle" style={{color: languageColor}}></i> {repo.language}</p>
                <p><i className="fa-solid fa-star" style={{color: '#6C757D'}}></i> {repo.stargazers_count}</p>
                <p><i className="fa-solid fa-code-fork" style={{color: '#6C757D'}}></i> {repo.forks_count}</p>
                <p><i className="fa-solid fa-circle-exclamation" style={{color: '#6C757D'}}></i> {repo.watchers}</p>
              </div>
            </div>
          ) }

        {isEmpty && <Empty/>}
        {isLoading && !hasFetched && <Loading/>}
        {error && <Error message={error}/>}

      {!error ? (<Button  onClick={handleFetchRepo} disabled={language === '' || isLoading ? isActive : !isActive} className='btn-refresh'>Refresh</Button>) : <Button className='btn-err' onClick={handleFetchRepo}>Click to retry</Button>}
    </div>
  )
}

export default App