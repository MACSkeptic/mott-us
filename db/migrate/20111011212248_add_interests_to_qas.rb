class AddInterestsToQas < ActiveRecord::Migration
  def change
    add_column :qas, :interests_as_string, :text
  end
end
