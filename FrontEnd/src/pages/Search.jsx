import React , {useState} from 'react';
import Sidebar from '../components/Sidebar';  
import ProfileCard from '../components/ProfileCard';
import '../css/Search.css';
    

const Search = () => {
    const [CantEnc, setNumber] = useState(0);
    
    const updateNumber = (newValue) => 
    {
      setNumber(Number(newValue));
    };
  
    const renderComponents = () => 
    {
      let components = [];
      for (let i = 0; i < CantEnc; i++) 
        {
        components.push(<ProfileCard key={i} />); 
        }
        return components;
    };
    
    return (
      <div className='search-page'>
        <Sidebar />  
        <div className='search-content'>
          <p>Cantidad de perfiles encontrados: {CantEnc}</p>
          <p>Ingrese cantidad de perfiles encontrados </p>
          <input type="number" onChange={ e => updateNumber(e.target.value) } placeholder="Actualizar cantidad de perfiles encontrados" />   
          <div className='profile-cards'>
            {renderComponents()} 
          </div>
        </div>
      </div>
    );
};

export default Search;