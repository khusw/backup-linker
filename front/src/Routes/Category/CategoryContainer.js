import React, { useEffect, useState } from "react";
import CategoryPresenter from "./CategoryPresenter";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_CATEGORIRES,
  ADD_CATEGORY,
  SUBSCRIPTION_CATEGORY,
} from "./CategoryQueries";

export default withRouter(({ location }) => {
  const [categoryArr, setCategoryArr] = useState([]);
  const {
    subscribeToMore,
    data: categoryList,
    error: categoryQueryError,
    loading: categoryQueryLoading,
  } = useQuery(GET_CATEGORIRES);

  let categories;
  if (categoryList !== undefined) {
    const { getCategories } = categoryList;
    categories = getCategories;
  }

  useEffect(() => {
    if (categoryQueryError) {
      console.error(categoryQueryError);
    }
    if (categoryArr) {
      setCategoryArr(categoryArr.getCategories, [
        categoryQueryError,
        categoryArr,
      ]);
    }
  }, [categoryQueryLoading]);

  const subscribeToNewCategory = () => {
    subscribeToMore({
      document: SUBSCRIPTION_CATEGORY,
      updateQuery: (currentCategories, { subscriptionData }) => {
        if (!subscriptionData.data) return currentCategories;
        const newCategory = subscriptionData.data.subCategory;
        const updateCategory = currentCategories.getCategories.concat(
          newCategory
        );
        setCategoryArr(updateCategory);
        return { getCategories: updateCategory };
      },
    });
  };

  return (
    <CategoryPresenter
      location={location}
      categories={categories}
      subscribeToNewCategory={subscribeToNewCategory}
    />
  );
});
