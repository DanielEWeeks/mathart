#' Generate butterfly3 data
#'
#' Generates data for plotting a butterfly and stores it in a data frame with (x, y) coordinates and radius r
#' 
#' The equations were discovered by the mathematical artist \href{https://mathematics.culturalspot.org/home}{Hamid Naderi Yeganeh}. \cr
#' 
#' Hamid's equations can be found \href{https://www.huffingtonpost.com/entry/using-mathematical-formul_b_9313484.html}{here}.
#' 
#' @param n The number of points to generate
#' @keywords butterfly
#' @export
#' @examples
#' butterfly3()

butterfly3 <- function(n = 40000) {
  data.frame(k = 1:n) %>%
    dplyr::mutate(
      x = (3/2)*(cos(141*pi*k/40000))^9*(1-(1/2)*sin(pi*k/40000))*(1-(1/4)*(cos(2*pi*k/40000))^30*(1+(cos(32*pi*k/40000))^20))*(1-(1/2)*(sin(2*pi*k/40000))^30*(sin(6*pi*k/40000))^10*((1/2)+(1/2)*(sin(18*pi*k/40000))^20)),
      y = cos(2*pi*k/40000)*(cos(141*pi*k/40000))^2*(1+(1/4)*(cos(pi*k/40000))^24*(cos(3*pi*k/40000))^24*(cos(21*pi*k/40000))^24),
      r = (1/100)+(1/40)*((cos(141*pi*k/40000))^14+(sin(141*pi*k/40000))^6)*(1-(cos(pi*k/40000))^16*(cos(3*pi*k/40000))^16*(cos(12*pi*k/40000))^16)
    ) %>%
    dplyr::select(-k)
}
