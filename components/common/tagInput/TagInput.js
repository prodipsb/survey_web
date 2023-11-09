import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect } from "react";
import { useGetApiCallQuery } from "../../../redux/commonAPICall/commonAPICall";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagInput = ({ inputDispatch, view, data, setData, placeholder }) => {
  const [tags, setTags] = useState([]);

  const {
    data: tagData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetApiCallQuery("settings/skills");

  const suggestions = tagData?.data?.map((val) => {
    return {
      id: val.id,
      text: val.text,
    };
  });

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  useEffect(() => {
    !view &&
      inputDispatch &&
      inputDispatch({
        type: "INPUT",
        payload: {
          name: "skills",
          value: tags,
          step: "employment",
        },
      });
  }, [tags]);

  useEffect(() => {
    !view &&
      setData &&
      setData((prev) => {
        return {
          ...prev,
          ["skills"]: tags,
        };
      });
  }, [tags]);

  useEffect(() => {
    if (data?.length !== 0) {
      setTags(data);
    }
  }, [data]);

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        inputFieldPosition="bottom"
        autocomplete
        id={"number"}
        readOnly={view}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TagInput;
