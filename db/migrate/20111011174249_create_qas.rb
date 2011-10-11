class CreateQas < ActiveRecord::Migration
  def change
    create_table :qas do |t|
      t.string :name
      t.string :email
      t.text :about

      t.timestamps
    end
  end
end
