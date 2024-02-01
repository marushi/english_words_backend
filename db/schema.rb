# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_23_145932) do
  create_table "english_words", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "word", null: false
    t.datetime "learned_at"
    t.datetime "created_at", default: -> { "(curdate())" }, null: false
    t.datetime "updated_at", default: -> { "(curdate())" }, null: false
    t.bigint "user_id", null: false
    t.string "word_japanese", default: "", null: false
    t.string "phonetic_symbol", default: "", null: false
    t.json "example_sentence", null: false
    t.string "synonym", default: "", null: false
    t.string "synonym_japanese", default: "", null: false
    t.string "description_and_origin", default: "", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", default: -> { "(curdate())" }, null: false
    t.datetime "updated_at", default: -> { "(curdate())" }, null: false
    t.string "cognito_uuid", null: false
    t.string "refresh_token", limit: 2048
    t.integer "expires_in"
    t.datetime "authorized_at", null: false
  end

end
