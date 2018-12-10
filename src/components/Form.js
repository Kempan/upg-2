import React from 'react';

const Form = props => {
  return (
    <form onSubmit={props.getWeather}>
      <input type="text" name="city" placeholder="Enter city.." />
      <input type="text" name="country" placeholder="Enter country.." />
      <button type="submit">Get weather!</button>
    </form>
  );
}

export default Form;
