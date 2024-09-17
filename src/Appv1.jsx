
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
  
  const [repo, setRepo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [language, setLanguage] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [renderRepo, setRenderRepo] = useState(null);

  const handleFetchRepo = useCallback(function() {
    async function fetchRepos () {

       try{
        setIsEmpty(false)
        setIsLoading(true)
        setError('')
        setIsActive(!isActive)
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
        if(data.items.length === 0) throw new Error ('No repository found');
        
        setRepo(data.items);
        setRenderRepo(data.items[randomNumber(data.items.length)]);
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
  }, [language, isActive])



  function randomNumber (max) {
    return Math.floor(Math.random() * (max + 1))
  }


  useEffect(function() {
    if (repo.length > 0) {
      let num = randomNumber(repo.length)
      setRenderRepo (repo[num])
    }
  }, [repo])


  return (
    <div className="repo-body">  
    <h2>GitHub Repository Finder</h2>
      <select value={language} onChange={(e)=> setLanguage(e.target.value)}> 
      <option value=''>Select language</option>
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="solidity">Solidity</option> 
      <option value="python">Python</option> 
      <option value="c++">C++</option> 
      <option value="PHP">PHP</option> 
      </select>

          {renderRepo && (
            <div key={renderRepo.id} className="repo-card">
              <h3>{renderRepo.name}</h3>
              <p>{renderRepo.description}</p>
              <div className="repo-icon">
                <p><i className="fa-solid fa-circle" style={{color: 'gold'}}></i> {renderRepo.language}</p>
                <p><i className="fa-solid fa-star" style={{color: '#6C757D'}}></i> {renderRepo.stargazers_count}</p>
                <p><i className="fa-solid fa-code-fork" style={{color: '#6C757D'}}></i> {renderRepo.forks_count}</p>
                <p><i className="fa-solid fa-circle-exclamation" style={{color: '#6C757D'}}></i> {renderRepo.watchers}</p>
              </div>
            </div>
          ) }

        {isEmpty && <Empty/>}
        {isLoading && <Loading/>}
        {error && <Error message={error}/>}

      {!error && (<Button  onClick={handleFetchRepo} disabled={language === '' ? isActive : !isActive} className='btn-refresh'>Fetch Repository</Button>)}
    </div>
  )
}

export default App