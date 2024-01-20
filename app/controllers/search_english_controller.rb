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
    english_vocabulary_list = arguments_dict.map { |_, value| value }


    render json: { english_vocabulary_list: }, status: :created
  end

  private

  def call_chat_gpt(keyword, situation, style, difficulty, type)

    property_common = {
      'type' => 'object',
      'properties' => {
        'example_sentence' => {
          'type' => 'array',
          'items' => {
            'type' => 'object',
            'properties' => {
              'sentence' => { 'type' => 'string', 'not_null' => true },
              'sentence_japanese' => { 'type' => 'string', 'not_null' => true }
            },
            'not_null' => true
          },
          'not_null' => true
        },
        'phonetic_symbol' => { 'type' => 'string', 'default' => '', 'not_null' => true },
        'synonym' => { 'type' => 'string', 'default' => '', 'not_null' => true },
        'synonym_japanese' => { 'type' => 'string', 'default' => '', 'not_null' => true },
        'word' => { 'type' => 'string', 'not_null' => true },
        'word_japanese' => { 'type' => 'string', 'default' => '', 'not_null' => true }
      }
    }

functions = [
  {
    'name' => 'search_english_vocabulary',
    'description' => "ユーザーから送られたキーワードと条件に合致する#{type}を7個返す",
    'parameters' => {
      'type' => 'object',
      'properties' => {
        '1' => property_common.merge('description' => "#{type}1"),
        '2' => property_common.merge('description' => "#{type}2"),
        '3' => property_common.merge('description' => "#{type}3"),
        '4' => property_common.merge('description' => "#{type}4"),
        '5' => property_common.merge('description' => "#{type}5"),
        '6' => property_common.merge('description' => "#{type}6"),
        '7' => property_common.merge('description' => "#{type}7"),
      },
      'required' => %w[1 2 3 4 5 6 7]
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
  rescue StandardError => e
    Rails.logger.error(e)
  end
end
