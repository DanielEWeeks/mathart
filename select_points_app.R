##shiny app to select points
# From: https://github.com/will-r-chase/aRt

#enter your rds file for ordered points dataframe of your image outline
#file comes from get_edge_points.R
imageOutline <- readRDS("XmasTree.rds")
imageOutline <- readRDS("Deer.rds")

library(ggplot2)
library(tidyverse)
shinyApp(
  ui = basicPage(
    fluidRow(
      column(width = 12,
             plotOutput("plot", height = 500, width = 1200, #change this to adjust view of plot in app
                        click = "plot_click"
             ),
             h4("Clicked points"),
             DT::DTOutput("plot_clickedpoints")
      ),
      column(width = 12,
             plotOutput("selected_plot", height = 500, width = 1200)) #change this to adjust view of plot in app
    )
  ),
  server = function(input, output, session) {
    data <- imageOutline

    # vals <- reactiveValues(
    #    keeprows = rep(TRUE, nrow(data)
    # ))
    var1 <- c()
    var2 <- c()
    val <- reactiveValues( clickx = NULL, clicky = NULL, data = cbind (var1, var2))

    observe({
      input$plot_click
      isolate({
        # save new points added
        x = input$plot_click$x
        y = input$plot_click$y
        val$clickx = c(val$clickx, input$plot_click$x)
        val$clicky = c(val$clicky, input$plot_click$y)
        if (!is.null(x)) {
        var3 = matrix(data=c(x,y),nrow=1,ncol=2)
        # add new points to data
        val$data <- rbind(val$data, var3)
        }
      })
    })


    output$plot1 <- renderPlot({
      input$updateplot
      plot(val$data[,1], val$data[,2])
    })


    output$plot <- renderPlot({
      ggplot(data, aes(x,y)) +
        geom_point(size = 0.2) +
        xlim(0, 2000) +
        ylim(0, 2500) +
        theme_void() +
        scale_y_reverse()
    })
    output$selected_plot <- renderPlot({
      val_dat <- as.data.frame(val$data)
      ggplot(val_dat, aes(x = val_dat[,1], y = val_dat[,2])) +
        geom_path() +
        xlim(0, 2000) +
        ylim(0, 2500) +
        theme_void() +
        scale_y_reverse()
    })
    # observeEvent(input$plot_click, {
    #   res <- nearPoints(data, input$plot_click, maxpoints = 1, allRows = TRUE)
    #   vals$keeprows <- xor(vals$keeprows, res$selected_)
    # })
    output$plot_clickedpoints <- DT::renderDT({
      as.data.frame(val$data)},
      extensions = c('Buttons'),
      options = list(
        dom = 'Bfrtip',
        buttons = c('copy', 'csv'),
        pageLength = nrow(data)
    ))
  }
)
