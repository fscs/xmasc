class CreateImp < ActiveRecord::Migration
  def change
    create_table :imps do |t|
      t.string :name
      t.string :email

      t.index :email, unique: true
    end
  end
end
