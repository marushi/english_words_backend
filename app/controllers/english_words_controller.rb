class EnglishWordsController < ApplicationController
  def all
    render json: EnglishWord.where(user_id: current_user.id)
  end

  def index; end
  def create
    english_word = EnglishWord.new(word: params[:word], user_id: current_user.id)
    if english_word.save
      render json: english_word
    else
      render json: { errors: english_word.errors }, status: :unprocessable_entity
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

end
