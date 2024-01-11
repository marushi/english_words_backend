# app/controllers/your_controller.rb

class SearchEnglishController < ApplicationController
  def search
    body = JSON.parse(request.body.read)
    keyword = body['keyword']
    situation = body['situation']
    style = body['style']
    difficulty = body['difficulty']
    type = body['type']

    chat_gpt_result = call_chat_gpt(keyword, situation, style, difficulty, type)
    arguments_str = chat_gpt_result['choices'][0]['message']['function_call']['arguments']
    arguments_dict = JSON.parse(arguments_str)

    english_vocabulary_list = [
      arguments_dict['1_en'],
      arguments_dict['2_en'],
      arguments_dict['3_en'],
      arguments_dict['4_en'],
      arguments_dict['5_en'],
      arguments_dict['6_en'],
      arguments_dict['7_en']
    ]
    japanese_vocabulary_list = [
      arguments_dict['1_ja'],
      arguments_dict['2_ja'],
      arguments_dict['3_ja'],
      arguments_dict['4_ja'],
      arguments_dict['5_ja'],
      arguments_dict['6_ja'],
      arguments_dict['7_ja']
    ]

    render json: {
      english_vocabulary_list:,
      japanese_vocabulary_list:
    }, status: :created
  end

  private

  def call_chat_gpt(keyword, situation, style, difficulty, type)
    functions = [
      {
        'name' => 'search_english_vocabulary',
        'description' => "ユーザーから送られたキーワードと条件に合致する#{type}を10個返す",
        'parameters' => {
          'type' => 'object',
          'properties' => {
            '1_en' => { 'type' => 'string', 'description' => "#{type}1" },
            '1_ja' => { 'type' => 'string', 'description' => "#{type}1の日本語" },
            '2_en' => { 'type' => 'string', 'description' => "#{type}2" },
            '2_ja' => { 'type' => 'string', 'description' => "#{type}2の日本語" },
            '3_en' => { 'type' => 'string', 'description' => "#{type}3" },
            '3_ja' => { 'type' => 'string', 'description' => "#{type}3の日本語" },
            '4_en' => { 'type' => 'string', 'description' => "#{type}4" },
            '4_ja' => { 'type' => 'string', 'description' => "#{type}4の日本語" },
            '5_en' => { 'type' => 'string', 'description' => "#{type}5" },
            '5_ja' => { 'type' => 'string', 'description' => "#{type}5の日本語" },
            '6_en' => { 'type' => 'string', 'description' => "#{type}6" },
            '6_ja' => { 'type' => 'string', 'description' => "#{type}6の日本語" },
            '7_en' => { 'type' => 'string', 'description' => "#{type}7" },
            '7_ja' => { 'type' => 'string', 'description' => "#{type}7の日本語" }
          },
          'required' => %w[
            1_en 1_ja 2_en 2_ja 3_en 3_ja 4_en 4_ja
            5_en 5_ja 6_en 6_ja 7_en 7_ja
          ]
        }
      }
    ]

    access_token = ENV.fetch('OPENAI_API_KEY')
    ::OpenAI::Client.new(access_token:).chat(
      parameters: {
        model: 'gpt-3.5-turbo-16k-0613',
        messages: [
          {
            'role' => 'system',
            'content' => <<~SYSTEM_MESSAGE
              あなたは英語学習アプリのアシスタントです。英語学習者に言われた条件の英語#{type}を10個返却してください。全て英語と日本語を返してください。条件は以下です。
              キーワード：#{keyword}
              シチュエーション：#{situation}
              スタイル：#{style}
              難易度：#{difficulty}
            SYSTEM_MESSAGE
          }
        ],
        functions:,
        function_call: { 'name' => 'search_english_vocabulary' }
      }
    )


  end
end
