# gitHub Repo Finder - a challenge on [roadmap.sh](https://roadmap.sh/projects/github-random-repo)

This project helped to work with external APIs, handling asynchronous requests, and managing different UI states with JavaScript.

I created a GitHub repository finder that allows users to select a programming language from a dropdown menu. The app used the GitHub Repository Search API to fetch and display a random repository that matches the selected language. The displayed information includes the repository name, description, number of stars, forks, and open issues. Users can fetch another random repository with the “Refresh” button when clicked.

The application handles loading, empty, and error states effectively. After successfully fetching a repository, a “Refresh” button appears to allow users to get another random repository. And if it is an error a “Click to retry” button appears to fetch the repo again. 

## The three states

### Empty state: The state when the page first loaded. 
![image](https://github.com/user-attachments/assets/e5853250-29ad-469c-8c52-998d7eed71ca)

### Loading state: The state when the repo informatin is been fetched. 
![image](https://github.com/user-attachments/assets/63eb8cb0-db8a-475a-9b9e-00a321f8f4fe)

### Error state: The state when the repo is unable to fecth.
![image](https://github.com/user-attachments/assets/4b3cfef6-0b56-463d-9f8e-9c1303341fdd)

## When repo is completely fetched 
![image](https://github.com/user-attachments/assets/def0aec7-5251-41d2-a45e-316eeea567de)


## Technology used 
* HTML
* CSS
* REACT (javascript)
   - useState ()
   - useEffect ()
   - callBack function ()
   - {children} component

## Challenges 

* To randomly print the repo information on the screen. i was geting the whole array of respetive language selected. this was fixed with the help of js `Math.floor(Math.random() * max)`
* Ability to print the repo when any language is selected. I could not figure this out. what i did was to show the "refresh" button at empty state but disabled if no language selected and also when loading.

## Live solution 
Visit this page to try out the application [giHub-repo-finder](https://git-hub-repo-finder.vercel.app)

If you like this project do well to show support by starring it 🙏. 

if you wanna take on challenges like this check it out [here](https://roadmap.sh/) 





