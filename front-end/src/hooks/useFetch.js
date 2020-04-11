
import { useState, useEffect } from 'react';


function useFetch(args, fetchFunc) {

  const [data, setData] = useState(null);
  const [argData, setArgData] = useState(null);
  const [error, setError] = useState(false);


  //This is how the determination is made if fetch should run or not

  if ( args ) {  // 1).  Are there any arguments?
    
    if (argData ) { //2).  There's previous arg data
      if ( args.length !== argData.length) { //Are the lengths different?, immediately update args (should run effect)
        setArgData(args);
      }
      else {  //Args match in length
        for(let x = 0; x < args.length; x++) { //loop through them a do a compare
          if ( args[x] !== argData[x]) {
            setArgData(args);  //Arg data is not the same, set the args (should run effect)
            break;
          }
        }
      }

    }
    else { //There never was arg data, set it (should run effect)
      setArgData(args);
    }

  }
  else {  // no arguments
    if ( argData ) { //But were their previous arguments?  If so, zero out the args, data, and errors
      setArgData(null);
      setData(null);
      setError(false);
    }
  }
  
  useEffect(() => {

    console.log('fetch effect');

    if ( argData ) {
      setError(false);
      const performFetch = async () => {
        try {
          const result = await fetchFunc(...argData);
          setData(result);
        }
        catch(err) {
          console.log('error encountered executingfetch!');
          console.log(err);
          setError(true);
        }
      };

      performFetch();
  }

  }, [argData, fetchFunc]);  // I want this called every time

  return [data, error];


}

export default useFetch;