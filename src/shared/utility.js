export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const smallImage = (imagePath, size) => {
  const image = imagePath.match(/media\/screenshouts/)
    ? imagePath.replace(
        "media/screenshots",
        `media/resize/${size}/-/screenshots`
      )
    : imagePath.replace("/media/games/", `/media/resize/${size}/-/games/`);
  return image;
};
