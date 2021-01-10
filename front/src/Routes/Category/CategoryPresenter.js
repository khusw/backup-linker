import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faPlus } from "@fortawesome/free-solid-svg-icons";

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 20px;
  }
  span {
    margin-left: 10px;
    font-size: 20px;
  }
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`;

const ItemListContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 15px;
`;

const ItemList = styled.ul`
  align-items: center;
  svg {
    margin: 0px 10px;
  }
`;

const ItemListTopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

const Item = styled.li``;

const ItemText = styled.span`
  font-family: "Ubuntu", sans-serif;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  text-decoration: none;
  color: white;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #667aff;
  }
`;

export default ({ location, categories, subscribeToNewCategory }) => {
  const { pathname } = location;
  let path;
  useEffect(() => subscribeToNewCategory(), []);
  return (
    <>
      <CategoryContainer>
        <ItemListContainer>
          <ItemList>
            <ItemListTopBox>
              <FontAwesomeIcon icon={faArrowDown} /> Category
              <FontAwesomeIcon icon={faPlus} />
            </ItemListTopBox>
            {categories &&
              categories.map((e) =>
                (path = pathname + "/:" + e.name)(
                  <StyledLink to={path} key={e.id}>
                    <Item>
                      <ItemText># {e.name}</ItemText>
                    </Item>
                  </StyledLink>
                )
              )}
          </ItemList>
        </ItemListContainer>
      </CategoryContainer>
    </>
  );
};
