import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useStore } from '../store';
import { useQuery , useMutation} from 'react-query';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LoginRedirect = (props) => {

  const setLoggedIn = useStore(state => state.setLoggedIn);
  const setProfileId = useStore(state => state.setProfileId);
  const [text, setText] = useState('Loading...');
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const checkUserinProfile = async (userData) => {
    console.log('userData', userData);

    const qs = require('qs');
    const query = qs.stringify({
      filters: {
        user_id: {
          $eq: userData.id,
        },
      },
    }, {
      encodeValuesOnly: true,
    });

    await fetch(`${backendUrl}/api/profiles?${query}`)
    .then(r => r.json())
    .then(r => {
      console.log(r)
      //if not found, add the user to profile
      if(r.data.length === 0) {
        const data = {
          'user_id': userData.id.toString(),
          'user_name': userData.username
        };
        mutation.mutate({data});

      }else{
        //user is already in profile 
        setProfileId(r.data[0].id)
        setTimeout(() => navigate("/"), 3000);
      }
    });
  }

  const addUserToProfile = async (data) => {
    console.log(data);
    return await fetch(`${backendUrl}/api/profiles`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(data),
    }).then(r => r.json())
    .catch(err => {
      console.log(err)
    });
  }

  const mutation = useMutation(addUserToProfile, {
    onSuccess: () => {
      console.log("profile id added");
      setTimeout(()=> navigate('/'), 1000)
    },
  })

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${backendUrl}/api/auth/${params.providerName}/callback${location.search}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        setLoggedIn(res.jwt, res.user.username, res.user.id);
        console.log(localStorage);
        setText('You have been successfully logged in. You will be redirected in a few seconds...');
        
        //check if the userId is already in the profile db
        checkUserinProfile(res.user);

        //setTimeout(() => navigate("/"), 3000); // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err);
        setText('An error occurred, please see the developer console.')
      });
  }, [navigate, location.search, params.providerName, setLoggedIn]);

  return <p>{text}</p>
};

export default LoginRedirect;
