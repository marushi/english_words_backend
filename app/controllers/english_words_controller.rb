class EnglishWordsController < ApplicationController

  def all
    render json: EnglishWord.where(user_id: current_user.id)
  end

  def index; end
  def create
    ActiveRecord::Base.transaction do
      set_create_params!

      @params.each do |value|
        EnglishWord.create!(
          word: value[:word],
          word_japanese: value[:word_japanese],
          phonetic_symbol: value[:phonetic_symbol],
          synonym: value[:synonym],
          synonym_japanese: value[:synonym_japanese],
          example_sentence: value[:example_sentence],
          user_id: current_user.id
        )
      end
      render json: { status: 'ok' }, status: :ok
    rescue StandardError => e
      render json: { errors: e.message}, status: :unprocessable_entity
    end
  end

  def update
    english_word = EnglishWord.find(params[:id])
    if english_word.update(learned_at: params[:learned_at])
      render json: english_word
    else
      render json: { errors: english_word.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    ActiveRecord::Base.transaction do
      set_destroy_params!

      EnglishWord.where(user_id: current_user.id).where(id: @params.pluck(:id)).destroy_all
      render json: { status: 'ok' }, status: :ok
    rescue StandardError => e
      render json: { errors: e.message}, status: :unprocessable_entity
    end
  end

  private

  def set_create_params!
    @params = params.require(:english_words).map do |english_word_params|
      english_word_params.permit(:word, :word_japanese, :phonetic_symbol, :synonym, :synonym_japanese, example_sentence: [])
    end
  end

  def set_destroy_params!
    @params = params.require(:english_words).map do |english_word_params|
      english_word_params.permit(:id)
    end
  end
end
