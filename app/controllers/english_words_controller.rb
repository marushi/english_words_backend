class EnglishWordsController < ApplicationController
  def all
    render json: EnglishWord.where(user_id: current_user.id)
  end

  def index; end
  def create
    ActiveRecord::Base.transaction do
      params[:words].each do |word|
        EnglishWord.create!(word:, user_id: current_user.id)
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

end
