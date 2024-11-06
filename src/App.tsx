import SearchList from './components/searchList';
import FavList from './components/favList';
import FavProvider from './components/favProvider';
import './styles/style.css';

const App = () => {
  	return (
		<FavProvider>
			<div className="app">
      			<header className="app-header">
					<SearchList></SearchList>
					<FavList></FavList>
      			</header>
    		</div>
		</FavProvider>
  	);
}

export default App;
