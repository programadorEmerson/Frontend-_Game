import { Box, styled } from '@mui/material';

const SVGContainer = styled(Box)`
  margin-bottom: 12px;

  #error-404-img {
    max-width: 700px;
    display: block;
    margin: 0 auto;
  }

  #magnifying-glass {
    animation: bounceInUp 2s ease forwards;
  }

  #stick {
    animation: fadeIn 2s 3s ease forwards;
  }

  #left,
  #right,
  #stick,
  #decorations {
    opacity: 0;
  }

  #left,
  #right {
    animation: fadeIn 2s ease forwards;
  }

  #left {
    animation-delay: 1s;
  }

  #right {
    animation-delay: 2s;
  }

  #decorations {
    transform-origin: center;
    animation: fadeIn 2s ease forwards,
      rotate-grow 50s linear infinite alternate;
    animation-delay: 4s;
  }

  .st0 {
    fill: ${({ theme }) => theme.palette.common.black};
  }

  .st1 {
    opacity: 0.2;
  }

  .st2 {
    fill: ${({ theme }) => theme.palette.common.black};
    margin-left: -10px;
  }

  .st3,
  .st4 {
    fill: ${({ theme }) => theme.palette.common.black};
  }

  .st5 {
    fill: #e0e0e0;
  }

  .st6 {
    fill: #bdbdbd;
  }

  .st7 {
    opacity: 0.64;
    fill: #212121;
  }

  .st8 {
    fill: #f5f5f5;
  }

  .st9 {
    opacity: 0.8;
    fill: ${({ theme }) => theme.palette.primary.light};
  }

  @keyframes rotate-grow {
    from {
      transform: rotate(0) scale(0.8);
    }

    to {
      transform: rotate(360deg) scale(1.5);
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes bounceInUp {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    from {
      opacity: 0;
      transform: translate3d(0, 3000px, 0);
    }

    60% {
      opacity: 1;
      transform: translate3d(0, -20px, 0);
    }

    75% {
      transform: translate3d(0, 10px, 0);
    }

    90% {
      transform: translate3d(0, -5px, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .bounceInUp {
    animation-name: bounceInUp;
  }
`;

export { SVGContainer };
