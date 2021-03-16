export const createCar = /* GraphQL */ `
  mutation CreateCar(
    $input: CreateCarInput!
    $condition: ModelCarConditionInput
  ) {
    createCar(input: $input, condition: $condition) {
      id
      type
      latitude
      longitude
      heading
      orders {
        items {
          id
          createdAt
          type
          originLatitude
          originLongitude
          destLatitude
          destLongitude
          userId
          carId
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
