import { Skeleton, Stack } from "@chakra-ui/react";

const LoadingShimmerEffect = () => {
  return (
    <Stack gap={5}>
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
    </Stack>
  );
};

export default LoadingShimmerEffect;
