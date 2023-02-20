const getKeypadData = async () => {
  return [
    {
      id: Date.now(),
      name: "Match 1",
      values: [
        {
          name: "GA",
          value: false,
        },
        {
          name: "AL",
          value: false,
        },
        {
          name: "CA",
          value: true,
        },
      ],
    },
    {
      id: Date.now(),
      name: "Match 2",
      values: [
        {
          name: "GA",
          value: false,
        },
        {
          name: "AL",
          value: false,
        },
        {
          name: "CA",
          value: true,
        },
      ],
    },
    {
      id: Date.now(),
      name: "Match 3",
      values: [
        {
          name: "GA",
          value: false,
        },
        {
          name: "AL",
          value: true,
        },
        {
          name: "CA",
          value: true,
        },
      ], 
    },
    {
      id: Date.now(),
      name: "Match 4",
      values: [
        {
          name: "GA",
          value: false,
        },
        {
          name: "AL",
          value: false,
        },
        {
          name: "CA",
          value: true,
        },
      ], 
    },
  ];
};

export { getKeypadData };
