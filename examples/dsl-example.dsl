// DSL 예시
// LLM이 이 형식으로 UI를 생성하면 80% 토큰 절감!

Screen
  @backgroundColor: #f9fafb
  @scrollable: true

  AppBar
    @title: Container Components Demo
    @position: sticky
    @elevation: 1

  Container
    @maxWidth: xl
    @padding: 6

    VStack
      @spacing: 8

      Card
        CardHeader
          CardTitle: VStack & HStack Example
          CardDescription: 자식을 세로/가로로 배치하는 스택

        CardContent
          VStack
            @spacing: 4

            HStack
              @spacing: 3
              @justify: space-between
              @className: w-full

              Button: Button 1
              Button: Button 2
              Button: Button 3

            HStack
              @spacing: 3
              @alignment: center

              Input
                @placeholder: Enter text...
                @className: flex-1

              Button: Submit

      Card
        CardHeader
          CardTitle: Grid Example
          CardDescription: 반응형 그리드 레이아웃

        CardContent
          Grid
            @columns: 3
            @gap: 4
            @responsive: {sm:{columns:1},md:{columns:2},lg:{columns:3}}

            Card
              CardHeader
                CardTitle: Card 1

            Card
              CardHeader
                CardTitle: Card 2

            Card
              CardHeader
                CardTitle: Card 3

            Card
              CardHeader
                CardTitle: Card 4

            Card
              CardHeader
                CardTitle: Card 5

            Card
              CardHeader
                CardTitle: Card 6

      Card
        CardHeader
          CardTitle: ScrollView Example
          CardDescription: 수평 스크롤 가능한 영역

        CardContent
          ScrollView
            @direction: horizontal
            @className: h-48

            HStack
              @spacing: 4
              @className: pr-4

              Card
                @className: min-w-[250px]
                CardHeader
                  CardTitle: Item 1

              Card
                @className: min-w-[250px]
                CardHeader
                  CardTitle: Item 2

              Card
                @className: min-w-[250px]
                CardHeader
                  CardTitle: Item 3
