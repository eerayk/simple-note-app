const randomColorProvider = (noteId) => {
    const colorOptionsArray = [
      "#5C2B29",
      "#1E3A5F",
      "#345920",
      "#5B2245",
      "#42275E",
      "#614A19",
      "#2D555E",
      "#635D19",
      "#442F19",
      "#16504B",
    ];
    const index = noteId % colorOptionsArray.length;
    return colorOptionsArray[index];
  };

  export {randomColorProvider};