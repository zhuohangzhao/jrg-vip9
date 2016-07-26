str = '.. <!-- My -- comment \n test --> ..  <!----> .. '
re = /<!--[\s\S]*?-->/g

str.match(re) // '<!-- My -- comment \n test -->', '<!---->'