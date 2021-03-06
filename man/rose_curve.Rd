% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/rose_curve.R
\name{rose_curve}
\alias{rose_curve}
\title{Generate rose curve}
\usage{
rose_curve(n, d, delta = pi/180, N = 32)
}
\arguments{
\item{n}{Curve parameter}

\item{d}{Curve parameter}

\item{delta}{Timestep}

\item{N}{Determines the extent of the curve}
}
\description{
Generates data for plotting a rose curve and stores it in a data frame with (x, y) coordinates. Refer to the \href{https://en.wikipedia.org/wiki/Rose_(mathematics)}{Wikipedia article} for details.
}
\examples{
rose_curve()
}
\keyword{curve}
\keyword{rose}
