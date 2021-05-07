import React from "react";
import styled from "styled-components";

const Search = ({ setSearchData, saveList, sending, searchData }) => {
  const handleOnChange = (e) => {
    setSearchData(e.target.value);
    
  };

  return (
    <Container>
      <Form id="create-course-form" onSubmit={sending}>
        <InputWrapper>
          <Input
            type="search"
            name="movie"
            placeholder="movie nominees"
            onChange={handleOnChange}
            value={searchData}
          />
        </InputWrapper>
        <div>
          <Button type="submit">search</Button>
        </div>
      </Form>
      {saveList.length === 5 && (
        <p>You have selected your 5 movie nominations</p>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 4%;
  background: rgb(13 136 207 / 18%);
  height: 150px;
  position: relative;
  margin-bottom: 15px;
  p {
    text-align: center;
    background: red;
    color: white;
    position: absolute;
    width: 100%;
    padding: 10px 0;
    top: 95px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  padding: 20px;
  flex: 1;
  border-radius: 4px;
  width: 80%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 12px;
  font-size: 18px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 18px;
  background: #e7e7e7;
  border: none;
  &:hover {
    background: #9e9e9e;
    color: #fff;
  }
`;
